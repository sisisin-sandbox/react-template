import { filter, map, mergeMap } from 'rxjs/operators';
import { HomeResponse } from '../../entity/HomeResponse';
import { httpClient } from '../../services/HttpClient';
import { AppEpic } from '../../services/util';
import { homeAggregate, homeFilters } from './HomeMT';

export const fetchHome: AppEpic = (action$, state$, dependencies) =>
  action$.pipe(
    filter(homeFilters.init),
    mergeMap(() => httpClient.get<HomeResponse>('/home', { home: 'home!' })),
    map(res => homeAggregate.creators.initFullfilled(res.body)),
  );
