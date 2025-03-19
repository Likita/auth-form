import { initDB, addUser, getUser, verifyPassword, hashPassword } from '../db';
import 'fake-indexeddb/auto';

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

beforeAll(() => {
  if (!global.crypto.subtle) {
    Object.defineProperty(global.crypto, 'subtle', {
      value: {
        digest: async (_: AlgorithmIdentifier, data: ArrayBuffer) => {
          const { createHash } = await import('node:crypto');
          return createHash('sha256').update(Buffer.from(data)).digest();
        },
      },
    });
  }
});

describe('Database Functions', () => {
  beforeEach(async () => {
    const db = await initDB();
    const transaction = db.transaction('users', 'readwrite');
    transaction.objectStore('users').clear();
  });

  test('initDB should create a database with users store', async () => {
    const db = await initDB();
    expect(db.objectStoreNames.contains('users')).toBe(true);
  });

  test('addUser should add a user to the database', async () => {
    await addUser('test@example.com', 'password123', 'Test User');
    const user = await getUser('test@example.com');
    expect(user).toBeDefined();
    expect(user?.email).toBe('test@example.com');
    expect(user?.name).toBe('Test User');
  });

  test('getUser should return undefined for non-existing user', async () => {
    const user = await getUser('nonexistent@example.com');
    expect(user).toBeUndefined();
  });

  test('hashPassword should hash passwords correctly', async () => {
    const password = 'securePassword';
    const hashed = await hashPassword(password);
    expect(hashed).toMatch(/^[a-f0-9]{64}$/);
  });

  test('verifyPassword should correctly validate password hashes', async () => {
    const password = 'securePassword';
    const hashed = await hashPassword(password);
    const isValid = await verifyPassword(password, hashed);
    expect(isValid).toBe(true);
  });
});
