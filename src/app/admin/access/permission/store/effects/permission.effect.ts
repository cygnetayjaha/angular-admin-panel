import { Injectable }         from "@angular/core";
import { Effect, Actions }    from '@ngrx/effects';
import { Action }             from '@ngrx/store';
import { switchMap, map }     from 'rxjs/operators';
import { of }                 from 'rxjs/observable/of';
import { Observable }         from 'rxjs/Observable';
import { PermissionApiClient }      from "../../services/permission-api-client.service";
import PermissionForm               from "../../models/permission-form.model";
import * as loadPermissionsActions  from '../actions/load-permissions.action';
import * as createPermissionActions from '../actions/create-permission.action';
import * as updatePermissionActions from '../actions/update-permission.action';
import * as viewPermissionActions   from '../actions/view-permission.action';
import * as deletePermissionActions from '../actions/delete-permission.action';
import Permission from "../../models/permission.model";

/**
 * Access permission effects
 * 
 * @export
 * @class AccessPermissionEffects
 */
@Injectable()
export class AccessPermissionEffects {

  /**
   * Creates an instance of AccessPermissionEffects.
   * 
   * @param {Actions} actions$ 
   * @param {PermissionApiClient} permissionApiClient 
   * @memberof AccessPermissionEffects
   */
  constructor(
    private actions$: Actions,
    private permissionApiClient: PermissionApiClient
  ) {}

  /**
   * Load permissions effect
   * 
   * @type {Observable<Action>}
   * @memberof AccessPermissionEffects
   */
  @Effect()
  loadPermissions$: Observable<Action> = this.actions$
    .ofType(loadPermissionsActions.LOAD_PERMISSIONS)
    .switchMap(state => {
      return this.permissionApiClient.all()
        .map(permissions => new loadPermissionsActions.LoadPermissionsSuccessAction(permissions))
        .catch(error => of(new loadPermissionsActions.LoadPermissionsErrorAction(error)));
    });

  /**
   * Get permission effect
   * 
   * @type {Observable<Action>}
   * @memberof AccessPermissionEffects
   */
  @Effect()
  viewPermission$: Observable<Action> = this.actions$
    .ofType(viewPermissionActions.VIEW_PERMISSION)
    .map((action: viewPermissionActions.ViewPermissionAction) => action.payload)
    .switchMap(id => {
      return this.permissionApiClient.get(id)
        .map(permission => new viewPermissionActions.ViewPermissionSuccessAction(permission))
        .catch(error => of(new viewPermissionActions.ViewPermissionErrorAction(error)));
    });

  /**
   * Create permission effect
   * 
   * @type {Observable<Action>}
   * @memberof AccessPermissionEffects
   */
  @Effect()
  createPermission$: Observable<Action> = this.actions$
    .ofType(createPermissionActions.CREATE_PERMISSION)
    .map((action: createPermissionActions.CreatePermissionAction) => action.payload)
    .switchMap(state => {
      return this.permissionApiClient.create(state)
        .map(permission => new createPermissionActions.CreatePermissionSuccessAction(permission))
        .catch(error => of(new createPermissionActions.CreatePermissionErrorAction(error)));
    });

  /**
   * Update permission effect
   * 
   * @type {Observable<Action>}
   * @memberof AccessPermissionEffects
   */
  @Effect()
  updatePermission$: Observable<Action> = this.actions$
    .ofType(updatePermissionActions.UPDATE_PERMISSION)
    .map((action: updatePermissionActions.UpdatePermissionAction) => action.payload)
    .switchMap(permissionForm => {
      return this.permissionApiClient.update(permissionForm, permissionForm.id)
        .map(permission => new updatePermissionActions.UpdatePermissionSuccessAction(permission))
        .catch(error => of(new updatePermissionActions.UpdatePermissionErrorAction(error)));
    });

  /**
   * Delete permission effect
   * 
   * @type {Observable<Action>}
   * @memberof AccessPermissionEffects
   */
  @Effect()
  deletePermission$: Observable<Action> = this.actions$
    .ofType(deletePermissionActions.DELETE_PERMISSION)
    .map((action: deletePermissionActions.DeletePermissionAction) => action.payload)
    .switchMap(id => {
      return this.permissionApiClient.deleteRecord(id)
        .mergeMap((permission: Permission) => {
          return [
              new deletePermissionActions.DeletePermissionSuccessAction(permission),
              new loadPermissionsActions.LoadPermissionsAction()
          ];
        })
        .catch(error => of(new deletePermissionActions.DeletePermissionErrorAction(error)));
    });

  /**
   * Delete multiple permission effect
   * 
   * @type {Observable<Action>}
   * @memberof AccessPermissionEffects
   */
  @Effect()
  deleteMultiplePermissions$: Observable<Action> = this.actions$
    .ofType(deletePermissionActions.DELETE_MULTIPLE_PERMISSION)
    .map((action: deletePermissionActions.DeleteMultiplePermissionAction) => action.payload)
    .switchMap(ids => {
      return this.permissionApiClient.deleteMultipleRecords(ids)
        .mergeMap((permission: Permission) => {
          return [
              new deletePermissionActions.DeletePermissionSuccessAction(permission),
              new loadPermissionsActions.LoadPermissionsAction()
          ];
        })
        .catch(error => of(new deletePermissionActions.DeletePermissionErrorAction(error)));
    });
}