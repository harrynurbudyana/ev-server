import Tag, { ImportedTag } from '../../../../types/Tag';

import { HttpTagsRequest } from '../../../../types/requests/HttpTagRequest';
import Schema from '../../../../types/validator/Schema';
import SchemaValidator from './SchemaValidator';
import fs from 'fs';
import global from '../../../../types/GlobalType';

export default class TagValidator extends SchemaValidator {
  private static instance: TagValidator|null = null;
  private importedTagCreation: Schema;
  private tagCreate: Schema;
  private tagUpdate: Schema;
  private tagsGet: Schema;
  private tagsDeleteMany: Schema;

  private constructor() {
    super('TagValidator');
    this.importedTagCreation = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tag/imported-tag-create-req.json`, 'utf8'));
    this.tagCreate = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tag/tag-create.json`, 'utf8'));
    this.tagUpdate = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tag/tag-update.json`, 'utf8'));
    this.tagsGet = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tag/tags-get.json`, 'utf8'));
    this.tagsDeleteMany = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tag/tags-delete.json`, 'utf8'));
  }

  public static getInstance(): TagValidator {
    if (!TagValidator.instance) {
      TagValidator.instance = new TagValidator();
    }
    return TagValidator.instance;
  }

  validateImportedTagCreation(importedTag: ImportedTag): void {
    this.validate(this.importedTagCreation, importedTag);
  }

  validateTagCreate(tag: Tag): Tag {
    this.validate(this.tagCreate, tag);
    return tag;
  }

  validateTagUpdate(tag: Tag): Tag {
    this.validate(this.tagUpdate, tag);
    return tag;
  }

  validateTagsGet(data: any): HttpTagsRequest {
    this.validate(this.tagsGet, data);
    return data;
  }

  validateTagsDeleteMany(data: { tagIDs: string[] }): { tagIDs: string[] } {
    this.validate(this.tagsDeleteMany, data);
    return data;
  }
}
