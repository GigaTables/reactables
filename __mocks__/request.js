const rows = {"rows":[
  {"GT_RowId":123,"title":"Test Bar 123st row","id":123,"desc":"Lorem Ipsum is simply dummy Bar 7196 text of the printing and typesetting","info":"some info some info some info some info","date":"13:23:43 02:04:2017","field1":123,"field2":1357,"field3":12468},
  {"GT_RowId":66,"title":"Test Foo 66st row","id":66,"desc":"Lorem Ipsum is simply dummy Foo 9608 text of the printing and typesetting","info":"some info some info some info some info","date":"13:24:40 02:04:2017","field1":0,"field2":1300,"field3":12411},
  {"GT_RowId":105,"title":"Test Bar 105st row","id":105,"desc":"Lorem Ipsum is simply dummy Bar 7258 text of the printing and typesetting","info":"some info some info some info some info","date":"13:24:01 02:04:2017","field1":null,"field2":1339,"field3":12450}
]};

export default function fetch(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => resolve(rows)
    );
  });
}
