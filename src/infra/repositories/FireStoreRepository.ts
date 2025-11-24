import { ITodoRepository } from "../../domain/todo/ITodoRepository";
import { Todo } from '../../domain/todo/Todo';
import { injectable } from 'tsyringe';
import admin from 'firebase-admin';

@injectable()
export class FireStoreRepository implements ITodoRepository {
  
  private collectionName = 'todos';
  private inicialized = false;
  constructor() {
    // In production (Cloud Run) the runtime will have Application Default
    // Credentials when the service account is attached to the service. In CI
    // we authenticate earlier in the workflow (credentials_json) so calling
    // initializeApp without params uses ADC. For local dev you can set
    // GOOGLE_APPLICATION_CREDENTIALS to point to your JSON file.
    try {
      admin.initializeApp();
      this.inicialized = true;
    } catch (err) {
      if (err && String(err).includes('already exists')) {
        this.inicialized = true;
      } else {
        throw new Error(
          'Failed to initialize firebase-admin. Set GOOGLE_APPLICATION_CREDENTIALS for local dev or ensure Cloud Run has a service account with Firestore access.'
        );
      }
    }
  }

  private collection() {
    return admin.firestore().collection(this.collectionName);
  }

  async save(todo: Todo): Promise<void> {
    const firestore = admin.firestore();
    const data = {
      name: todo.name,
      description: todo.description ?? null,
      createdAt: admin.firestore.Timestamp.fromDate(todo.createdAt),
      updatedAt: admin.firestore.Timestamp.fromDate(todo.updatedAt),
      stateId: todo.stateId,
    } as FirebaseFirestore.DocumentData;

    await this.collection().doc(todo.id).set(data, { merge: true });
  }

  async findById(id: string): Promise<Todo | null> {
    const doc = await this.collection().doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() as FirebaseFirestore.DocumentData;
    return new Todo({
      id: doc.id,
      name: data.name,
      description: data.description ?? undefined,
      createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt && typeof data.updatedAt.toDate === 'function' ? data.updatedAt.toDate() : new Date(data.updatedAt),
      stateId: data.stateId,
    });
  }

  async findAll(): Promise<Todo[]> {
    const snap = await this.collection().get();
    const result: Todo[] = [];
    snap.forEach(doc => {
      const data = doc.data() as FirebaseFirestore.DocumentData;
      result.push(new Todo({
        id: doc.id,
        name: data.name,
        description: data.description ?? undefined,
        createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt && typeof data.updatedAt.toDate === 'function' ? data.updatedAt.toDate() : new Date(data.updatedAt),
        stateId: data.stateId,
      }));
    });
    return result;
  }

  async update(todo: Todo): Promise<void> {
    // Keep semantics simple: reuse save which does a merge
    await this.save(todo);
  }

  async delete(id: string): Promise<void> {
    await this.collection().doc(id).delete();
  }
}

