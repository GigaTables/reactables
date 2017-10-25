const DataException = function(message)
{
  this.message = message;
  this.name = 'DataException';
};
const EditorException = function(message)
{
  this.message = message;
  this.name = 'EditorException';
};

export {
  DataException,
  EditorException
}
