import { UserFireStoreRepository } from '../UserFireStoreRepository';
import { User } from '../../../domain/user/User';

// Mock de firebase-admin para UserFireStoreRepository
jest.mock('firebase-admin', () => {
  const mSet = jest.fn().mockResolvedValue(undefined);

  const mCollection = {
    doc: jest.fn((id?: string) => ({
      set: mSet,
    })),
    where: jest.fn(() => ({
      limit: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({
          empty: false,
          docs: [
            {
              id: 'id',
              data: () => ({
                email: 'test@example.com',
                createdAt: new Date(),
              }),
            },
          ],
        }),
      })),
    })),
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

describe('UserFireStoreRepository (unit, firebase-admin mock)', () => {
  let repo: UserFireStoreRepository;

  beforeEach(() => {
    repo = new UserFireStoreRepository();
  });

  it('should save a new user', async () => {
    (repo as any).findByEmail = jest.fn().mockResolvedValue(null);

    const user = new User({
      id: '1',
      email: 'test@example.com',
      createdAt: new Date(),
    });

    await expect(repo.save(user)).resolves.toBeUndefined();
  });

  it('should throw if user already exists', async () => {
    (repo as any).findByEmail = jest
      .fn()
      .mockResolvedValue(new User({ id: '1', email: 'test@example.com', createdAt: new Date() }));

    const user = new User({
      id: '1',
      email: 'test@example.com',
      createdAt: new Date(),
    });

    await expect(repo.save(user)).rejects.toThrow('User with this email already exists');
  });

  it('should find a user by email', async () => {
    const result = await repo.findByEmail('test@example.com');

    expect(result).toBeInstanceOf(User);
    expect(result?.email).toBe('test@example.com');
  });

  it('should return null if user not found', async () => {
    const admin = require('firebase-admin').default;
    (admin.firestore().collection() as any).where = () => ({
      limit: () => ({
        get: jest.fn().mockResolvedValue({ empty: true, docs: [] }),
      }),
    });

    const result = await repo.findByEmail('notfound@example.com');
    expect(result).toBeNull();
  });
});
