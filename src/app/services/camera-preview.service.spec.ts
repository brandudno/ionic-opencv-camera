import { TestBed } from '@angular/core/testing';

import { CameraPreviewService } from './camera-preview.service';

describe('CameraPreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraPreviewService = TestBed.get(CameraPreviewService);
    expect(service).toBeTruthy();
  });
});
