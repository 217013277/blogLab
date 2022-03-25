module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/article",
  "title": "Article",
  "description": "Article in blog",
        "type": "object",
        "properties": {
          "title":{
            "description":"Main Title",
              "type": "string"
          },
          "alltext":{
            "description":"Body",
              "type": "string"
          },
          "summary":{
            "description":"(Option) Summary",
              "type": "string"
          },
          "imageURL":{
            "description":"image URL",
              "type": "url"
          },
          "published":{
            "description":"Published",
              "type": "boolean"
          },
          "authorID":{
            "description":"User ID",
              "type": "integer",
              "minimum":0
          }
        },
  "required": ["title", "allText", "authorID"]
}
