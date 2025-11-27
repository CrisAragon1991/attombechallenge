import { ToDoFireStoreRepository } from '../ToDoFireStoreRepository';
import { Todo } from '../../../domain/todo/Todo';

jest.mock('firebase-admin', () => {
  const mSet = jest.fn().mockResolvedValue(undefined);
  const mUpdate = jest.fn().mockResolvedValue(undefined);
  const mDelete = jest.fn().mockResolvedValue(undefined);

  const buildDoc = (data: any) => ({
    set: mSet,
    update: mUpdate,
    delete: mDelete,
    get: jest.fn().mockResolvedValue({
      exists: true,
      id: data.id,
      data: () => data,
    }),
  });

  const mCollection = {
    doc: jest.fn((id?: string) =>
      buildDoc({
        id: id ?? '1',
        name: 'A',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        stateId: '1',
        userId: 'user1',
      })
    ),
    get: jest.fn().mockResolvedValue({
      forEach: (cb: (doc: any) => void) => {
        cb({
          id: '1',
          data: () => ({
            name: 'A',
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            stateId: '1',
            userId: 'user1',
          }),
        });
        cb({
          id: '2',
          data: () => ({
            name: 'B',
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            stateId: '2',
            userId: 'user1',
          }),
        });
      },
    }),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
  };

  const firestoreFn = () => ({
    collection: jest.fn(() => mCollection),
  });

  (firestoreFn as any).Timestamp = {
    fromDate: (date: Date) => date,
  };

  return {
    __esModule: true,
    default: {
      firestore: firestoreFn,
      credential: { cert: jest.fn() },
      initializeApp: jest.fn(),
    },
    firestore: firestoreFn,
    credential: { cert: jest.fn() },
    initializeApp: jest.fn(),
  };
});

describe('ToDoFireStoreRepository (unit, firebase-admin mock)', () => {
  let repo: ToDoFireStoreRepository;

  beforeEach(() => {
    repo = new ToDoFireStoreRepository();
  });

  it('should save a todo', async () => {
    const todo = new Todo({
      id: '1',
      name: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
      stateId: '1',
      userId: 'user1'
    });

    await expect(repo.save(todo)).resolves.toBeUndefined();
  });

  it('should find a todo by id', async () => {
    const result = await repo.findById('1');

    expect(result).toBeInstanceOf(Todo);
    expect(result?.id).toBe('1');
    expect(result?.name).toBe('A');
  });

  it('should return null if todo not found', async () => {
    const admin = require('firebase-admin').default;
    (admin.firestore().collection() as any).doc = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ exists: false }),
    }));

    const result = await repo.findById('x');
    expect(result).toBeNull();
  });

  it('should find all todos', async () => {
    const result = await repo.findAllByUserId('user1');

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toBeInstanceOf(Todo);
  });

  it('should update a todo if exists', async () => {
  const admin = require('firebase-admin').default;
  const mockUpdate = jest.fn().mockResolvedValue(undefined);

  // Para este test, simulamos que el doc SÍ existe
  (admin.firestore().collection() as any).doc = jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ exists: true }),
    update: mockUpdate,
  }));

  const todo = new Todo({
    id: '1',
    name: 'A updated',
    createdAt: new Date(),
    updatedAt: new Date(),
    stateId: '2',
    userId: 'user1'
  });

  await expect(repo.update(todo)).resolves.toBeUndefined();
  expect(mockUpdate).toHaveBeenCalled();
});

  it('should throw if todo to update does not exist', async () => {
    const admin = require('firebase-admin').default;
    (admin.firestore().collection() as any).doc = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ exists: false }),
      update: jest.fn(),
    }));

    const todo = new Todo({
      id: 'x',
      name: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
      stateId: '1',
      userId: 'user1'
    });

    await expect(repo.update(todo)).rejects.toThrow('Todo not found');
  });

  it('should delete a todo', async () => {
    const admin = require('firebase-admin').default;
    const mockDelete = jest.fn().mockResolvedValue(undefined);
    (admin.firestore().collection() as any).doc = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ exists: true, data: () => ({ userId: 'user1' }) }),
      delete: mockDelete,
    }));

    await expect(repo.deleteByUserId('1', 'user1')).resolves.toBeUndefined();
    expect(mockDelete).toHaveBeenCalled();
  });
});
