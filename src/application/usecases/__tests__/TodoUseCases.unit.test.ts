import { CreateTodoUseCase } from '../CreateTodoUseCase';
import { GetTodosUseCase } from '../GetTodosUseCase';
import { UpdateTodoUseCase } from '../UpdateTodoUseCase';
import { DeleteTodoUseCase } from '../DeleteTodoUseCase';
import { Todo } from '../../../domain/todo/Todo';
import { ITodoRepository } from '../../../domain/todo/ITodoRepository';

describe('Todo UseCases (unit, mock)', () => {
  describe('CreateTodoUseCase', () => {
    let repo: jest.Mocked<ITodoRepository>;
    let useCase: CreateTodoUseCase;
    beforeEach(() => {
      repo = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as unknown as jest.Mocked<ITodoRepository>;
      useCase = new CreateTodoUseCase(repo);
    });
    it('should save a todo and return it', async () => {
      const input = { name: 'test', description: 'desc', stateId: '1', userId: 'user1' };
      const result = await useCase.execute(input);
      expect(result).toBeInstanceOf(Todo);
      expect(result.name).toBe('test');
      expect(repo.save).toHaveBeenCalledWith(expect.any(Todo));
    });
  });

  describe('GetTodosUseCase', () => {
    let repo: jest.Mocked<ITodoRepository>;
    let useCase: GetTodosUseCase;
    beforeEach(() => {
      repo = {
        save: jest.fn(),
        findById: jest.fn(),
        findAllByUserId: jest.fn(),
        update: jest.fn(),
        deleteByUserId: jest.fn(),
      } as unknown as jest.Mocked<ITodoRepository>;
      useCase = new GetTodosUseCase(repo);
    });
    it('should return all todos', async () => {
      const todos = [
        new Todo({ id: '1', name: 'A', createdAt: new Date(), updatedAt: new Date(), stateId: '1', userId: 'user1' }),
        new Todo({ id: '2', name: 'B', createdAt: new Date(), updatedAt: new Date(), stateId: '2', userId: 'user1' }),
      ];
      repo.findAllByUserId.mockResolvedValue(todos);
      const result = await useCase.execute('user1');
      expect(result).toEqual(todos);
      expect(repo.findAllByUserId).toHaveBeenCalledWith('user1');
    });
  });

  describe('UpdateTodoUseCase', () => {
    let repo: jest.Mocked<ITodoRepository>;
    let useCase: UpdateTodoUseCase;
    let todo: Todo;
    beforeEach(() => {
      repo = {
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as unknown as jest.Mocked<ITodoRepository>;
      useCase = new UpdateTodoUseCase(repo);
      todo = new Todo({ id: '1', name: 'A', createdAt: new Date(), updatedAt: new Date(), stateId: '1', userId: 'user1' });
    });
    it('should update an existing todo', async () => {
      repo.findById.mockResolvedValue(todo);
      repo.update.mockResolvedValue();
      const input = { id: '1', name: 'B', description: 'desc', stateId: '2', userId: 'user1' };
      const result = await useCase.execute(input);
      expect(result.name).toBe('B');
      expect(result.description).toBe('desc');
      expect(result.stateId).toBe('2');
      expect(repo.update).toHaveBeenCalledWith(todo);
    });
    it('should throw if todo not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(useCase.execute({ id: 'x', userId: 'user1' })).rejects.toThrow('Todo not found');
    });
  });

  describe('DeleteTodoUseCase', () => {
    let repo: jest.Mocked<ITodoRepository>;
    let useCase: DeleteTodoUseCase;
    let todo: Todo;
    beforeEach(() => {
      repo = {
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        deleteByUserId: jest.fn(),
      } as unknown as jest.Mocked<ITodoRepository>;
      useCase = new DeleteTodoUseCase(repo);
      todo = new Todo({ id: '1', name: 'A', createdAt: new Date(), updatedAt: new Date(), stateId: '1', userId: 'user1' });
    });
    it('should delete an existing todo', async () => {
      repo.findById.mockResolvedValue(todo);
      repo.deleteByUserId.mockResolvedValue();
      await useCase.execute('1', 'user1');
      expect(repo.deleteByUserId).toHaveBeenCalledWith('1', 'user1');
    });
    it('should throw if todo not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(useCase.execute('x', 'user1')).rejects.toThrow('Todo not found');
    });
  });
});
