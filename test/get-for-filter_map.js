// const getRow = async (id) => {

//     // use service account creds
//     await doc.useServiceAccountAuth({
//         client_email: config.get('CLIENT_EMAIL'),
//         private_key: config.get('PRIVATE_KEY')
       
//     });

//     // load the documents info
//     await doc.loadInfo();

//     // Index of the sheet
//     let sheet = doc.sheetsByIndex[0]

//     // Get all the rows
//     let rows = await sheet.getRows();
//     let arrId = []
//     for (let index = 0; index < rows.length; index++) {
//         const row = rows[index]
//         if (row._id === id) {
//             arrId.push(row.user_id)
//         }
//     }
//     return arrId;
// }

// const arrIdUsers = await getRow('_id');
// console.log(typeof arrIdUsers[0])

// ===============================================================


// Конечно, вместо цикла for можно использовать 
// методы массивов - `filter` и `map`. 
// Вот так будет выглядеть исправленный код:


const getRow = async (id) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: config.get('CLIENT_EMAIL'),
        private_key: config.get('PRIVATE_KEY')
    });

    // load the documents info
    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0]

    // Get all the rows
    let rows = await sheet.getRows();
    let arrId = rows.filter(row => row._id === id).map(row => row.user_id);
    return arrId;
}

const arrIdUsers = await getRow('_id');
console.log(arrIdUsers);


// Здесь мы используем метод `filter`, 
// чтобы отфильтровать нужные строки, и метод `map`, 
// чтобы получить только значения поля `user_id`.

// ===================================================================


// В данном случае `arrId` является локальной 
// переменной внутри функции `getRow`, 
// поэтому её нельзя объявить заранее 
// с внешней области видимости. Однако, 
// если нужно задать начальные значения для массива, 
// можно воспользоваться параметром по умолчанию:

const getRow = async (id, arrId = ['466220524', '721836748']) => {

  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: config.get('CLIENT_EMAIL'),
    private_key: config.get('PRIVATE_KEY')
    // client_email: CREDENTIALS.client_email,
    // private_key: CREDENTIALS.private_key
  });

  // load the documents info
  await doc.loadInfo();

  // Index of the sheet
  let sheet = doc.sheetsByIndex[0]

  // Get all the rows
  let rows = await sheet.getRows();
  let arrIdUsers = rows.filter(row => row._id === id).map(row => row.user_id);

  // Combine with initial values
  arrIdUsers = [...arrId, ...arrIdUsers];

  return arrIdUsers;
}

const arrIdUsers = await getRow('_id');
console.log(arrIdUsers);


// Теперь функция `getRow` принимает два аргумента, 
// где `id` это идентификатор строки, 
// а `arrId` это начальное значение для массива. 
// Если второй аргумент не передан при вызове функции, 
// то массив инициализируется значением по умолчанию 
// ['466220524', '721836748']. 

// Таким образом, при вызове `getRow` только с идентификатором 
// _id: `const arrIdUsers = await getRow('_id');` - 
// в результате мы получим массив ['466220524', '721836748'], 
// т.к. значение по умолчанию для `arrId` 
// не было переопределено передачей другого массива в функцию.