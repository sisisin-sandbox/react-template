import { ActionType } from '@sisisin/redux-aggregate/typings/commons';
import { Aggregate } from '@sisisin/redux-aggregate/typings/createAggregate';
import { A1, A2, KeyMap } from '@sisisin/redux-aggregate/typings/utils';
import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { AppState } from '../App';
import { EpicDependencies } from '../store';

type MT<T> = (state: A1<T>) => A1<T>;

type FL<_T> = (action: { type: ActionType }) => action is { type: ActionType };
type FLPL<T> = (action: { type: ActionType }) => action is { type: ActionType; payload: A2<T> };
type ActionFilter<T> = T extends MT<T> ? FL<T> : FLPL<T>;
type ActionFilters<T> = { readonly [K in keyof T]: ActionFilter<T[K]> };

export function makeActionFilters<T extends KeyMap>(aggregate: Aggregate<T>): ActionFilters<T> {
  return Object.entries(aggregate.types).reduce(
    (acc, [key, value]) => {
      return { ...acc, [key]: (action: AnyAction) => action.type === value };
    },
    {} as Record<string, (action: AnyAction) => boolean>,
  ) as ActionFilters<T>;
}

export type GuardType<T> = T extends (o: any) => o is infer U ? U : never;
export type AppEpic = Epic<AnyAction, AnyAction, AppState, EpicDependencies>;

export function combineActionFilters<T extends (x: AnyAction) => x is any>(
  guards: T[],
): (x: AnyAction) => x is GuardType<T> {
  return ((x: any) => guards.some(g => g(x))) as any;
}
