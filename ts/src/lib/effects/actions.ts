import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { filter } from 'rxjs/operator/filter';
import { Action, ScannedActionsSubject } from '../store';

@Injectable()
export class Actions<V = Action> extends Observable<V> {
  constructor(@Inject(ScannedActionsSubject) source?: Observable<V>) {
    super();

    if (source) {
      this.source = source;
    }
  }

  lift<R>(operator: Operator<V, R>): Observable<R> {
    const observable = new Actions<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  ofType<V2 extends V = V>(...allowedTypes: string[]): Actions<V2> {
    return filter.call(this, (action: Action) =>
      allowedTypes.some(type => type === action.type)
    );
  }
}
