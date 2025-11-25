import { IUserRepository } from '../../domain/user/IUserRepository';
import { User } from '../../domain/user/User';
import { injectable } from 'tsyringe';
import admin from 'firebase-admin';

@injectable()
export class UserFireStoreRepository implements IUserRepository {
  private collectionName = 'users';

  private collection() {
    return admin.firestore().collection(this.collectionName);
  }

  async save(user: User): Promise<void> {
    const existing = await this.findByEmail(user.email);
    if (existing) {
      throw new Error('User with this email already exists');
    }
    const data = {
      email: user.email,
      createdAt: admin.firestore.Timestamp.fromDate(user.createdAt),
    } as FirebaseFirestore.DocumentData;

    const id = user.id ?? this.collection().doc().id;
    await this.collection().doc(id).set(data, { merge: true });
  }

  async findByEmail(email: string): Promise<User | null> {
    const q = await this.collection().where('email', '==', email).limit(1).get();
    if (q.empty) return null;
    const doc = q.docs[0];
    const data = doc.data() as FirebaseFirestore.DocumentData;
    return new User({
      id: doc.id,
      email: data.email,
      createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : new Date(data.createdAt),
    });
  }
}
