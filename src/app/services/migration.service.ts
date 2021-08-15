import {Injectable} from '@angular/core';
import {Storage} from '@capacitor/storage';

/**
 * Service that handles updates and does migrations.
 */
@Injectable()
export class MigrationService {
  run(): Promise<any> {
    return Promise.all([
      this.migrateCapacitorStorage(),
    ]);
  }

  private migrateCapacitorStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      const PREFIX = `[MigrationService capacitor storage]`;

      const testVal = localStorage.getItem(`_cap_auth_email`);
      if (!testVal) {
        console.log(`${PREFIX} No migration needed.`);
        resolve();
        return;
      }

      const keysToMigrate = new Set([
        'auth_jwt',
        'auth_email',
        'auth_password',
        'forms',
        'submissions',
      ]);

      const promises: Promise<any>[] = [];

      keysToMigrate.forEach(key => {
        const value = localStorage.getItem(`_cap_${key}`);

        promises.push(Storage.set({
          key,
          value,
        }).then(() => {
          localStorage.removeItem(`_cap_${key}`);
          console.log(`${PREFIX} Migrated ${key} to new capacitor storage plugin`);
          return;
        }));
      });

      Promise.all(promises)
        .then(resolve);
    });
  }
}
