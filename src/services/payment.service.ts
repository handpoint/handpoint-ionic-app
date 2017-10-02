import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class PaymentService {

    private _db;
    public _payments: any[] = [];

    private options = {
        include_docs: true,
        limit: 5
    };

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('payments.db', { adapter: 'cordova-sqlite' });
    }

    add(payment) {
        return this._db.post(payment);
    }

    mockData(num: number) {
        var i;
        for (i = 0; i < num; i++) {
            this.add({
                description: 'Payment ' + i,
                amount: i
            });
        }
    }

    fetchNextPage(): Promise<any> {
        var that = this;
        return new Promise((resolve, reject) => {
            that._db.allDocs(that.options, function (err, response) {
                if (err) {
                    // TODO handle errors
                } else if (response && response.rows.length > 0) {
                    that.options["startkey"] = response.rows[response.rows.length - 1];
                    that.options["skip"] = 1;
                    that._payments.push(response.rows);
                }
                resolve(that._payments)
            });
        });
    }

}