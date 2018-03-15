import { Injectable }     from '@angular/core';
import {
  HttpService,
  GET,
  POST,
  PUT,
  DELETE,
  Path,
  Adapter,
  Produces,
  MediaType,
  Body
}                         from '../../../../shared/asyncServices/http';
import { Observable }     from 'rxjs/Observable';
import { PermissionService }    from './permission.service';
import PermissionForm           from '../models/permission-form.model';

@Injectable()
export class PermissionApiClient extends HttpService {

  /**
   * Retrieves all permissions
   */
  @GET("permission")
  @Adapter(PermissionService.gridAdapter)
  public all(): Observable<any> { return null; };

  /**
   * Get permission by ID
   */
  @GET("permission/{id}")
  @Adapter(PermissionService.permissionDetailsAdapter)
  public get(@Path("id") id: number): Observable<any> { return null; };

  /**
   * Create new permission
   */
  @POST("permission")
  @Adapter(PermissionService.createPermissionAdapter)
  @Produces(MediaType.FORM_DATA)
  public create(@Body form: PermissionForm): Observable<any> { return null; };

  /**
   * Update new permission
   */
  @PUT("permission/{id}")
  @Adapter(PermissionService.createPermissionAdapter)
  @Produces(MediaType.FORM_DATA)
  public update(@Body form: PermissionForm, @Path("id") id: number): Observable<any> { return null; };

  /**
   * Delete permission by ID
   */
  @DELETE("permission/{id}")
  @Adapter(PermissionService.permissionDetailsAdapter)
  public deleteRecord(@Path("id") id: number): Observable<any> { return null; };

  /**
   * Delete permission by ID
   */
  @POST("permission/delete-all")
  @Produces(MediaType.FORM_DATA)
  @Adapter(PermissionService.permissionDetailsAdapter)
  public deleteMultipleRecords(@Body ids: {ids: Array<number>}): Observable<any> { return null; };
}