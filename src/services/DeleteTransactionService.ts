import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionRepository);

    const transactionId = await transactionsRepository.findOne(id);

    if (!transactionId) {
      throw new AppError('Transaction not found.');
    }

    await transactionsRepository.remove(transactionId);
  }
}

export default DeleteTransactionService;
