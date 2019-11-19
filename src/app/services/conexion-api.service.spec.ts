import { TestBed } from '@angular/core/testing';

import { ConexionApiService } from './conexion-api.service';

describe('ConexionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConexionApiService = TestBed.get(ConexionApiService);
    expect(service).toBeTruthy();
  });
});
