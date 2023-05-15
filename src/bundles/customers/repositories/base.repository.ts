import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

abstract class BaseRepository {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    protected generateUuid() {
        return v4();
    }
}

export default BaseRepository;
