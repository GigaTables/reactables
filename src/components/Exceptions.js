const DataException = (message) =>
{
  this.message = message;
  this.name = 'DataException';
}
const EditorException = (message) =>
{
  this.message = message;
  this.name = 'EditorException';
}

export {
  DataException,
  EditorException
}
