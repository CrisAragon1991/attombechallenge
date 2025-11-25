import { CreateUserUseCase } from '../CreateUserUseCase';
import { FindUserByEmailUseCase } from '../FindUserByEmailUseCase';
import { User } from '../../../domain/user/User';
import { IUserRepository } from '../../../domain/user/IUserRepository';

describe('User UseCases (unit, mock)', () => {
  describe('CreateUserUseCase', () => {
    let repo: jest.Mocked<IUserRepository>;
    let useCase: CreateUserUseCase;
    beforeEach(() => {
      repo = {
        save: jest.fn().mockResolvedValue(undefined),
        findByEmail: jest.fn(),
      };
      useCase = new CreateUserUseCase(repo);
    });
    it('should save a user and return it', async () => {
      const input = { email: 'test@example.com' };
      const result = await useCase.execute(input);
      expect(result).toBeInstanceOf(User);
      expect(result.email).toBe('test@example.com');
      expect(repo.save).toHaveBeenCalledWith(expect.any(User));
    });
  });

  describe('FindUserByEmailUseCase', () => {
    let repo: jest.Mocked<IUserRepository>;
    let useCase: FindUserByEmailUseCase;
    let user: User;
    beforeEach(() => {
      repo = {
        save: jest.fn(),
        findByEmail: jest.fn(),
      };
      useCase = new FindUserByEmailUseCase(repo);
      user = new User({ id: '1', email: 'test@example.com', createdAt: new Date() });
    });
    it('should return a user by email', async () => {
      repo.findByEmail.mockResolvedValue(user);
      const result = await useCase.execute('test@example.com');
      expect(result).toBe(user);
      expect(repo.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
    it('should throw if user not found', async () => {
      repo.findByEmail.mockResolvedValue(null);
      await expect(useCase.execute('notfound@example.com')).rejects.toThrow('User not found');
    });
  });
});
