import { mapPropsStream } from 'recompose';
import Rx from 'rxjs';
import * as ContextService from '../services/context-service';
import * as TypesService from '../services/types-service';

export default (propName = 'propertyTypeDetails') =>
  mapPropsStream((props$) => {
    const typeDetails$ = props$
      .map(x => x.property)
      .distinctUntilChanged()
      .switchMap(async (property) => {
        if (property.startsWith(ContextService.KEYS_IDENTITY)) {
          return await TypesService.getValueTypeDefinition(
            property.substring(ContextService.KEYS_IDENTITY.length),
          );
        }
        return ContextService.getPropertyTypeDetails(property);
      });

    return Rx.Observable
      .combineLatest(props$, typeDetails$)
      .map(([props, propertyTypeDetails]) => ({ ...props, [propName]: propertyTypeDetails }));
  });
