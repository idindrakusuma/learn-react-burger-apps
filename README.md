# Burger App - Real Project from Udemy React Course

<center>
<img src="./src/assets/images/burger-logo.png" style="max-width: 100px">
</center>

## How to run

- Clone this repo on your local machine
- enter repo directory
- run this command `npm install`
- then, `npm start`
- Open your browser and open in `localhost:3000`

## How to Deploy in Firebase?

- Make initial setup `npm install -g firebase-tools`
- `firebase login` => then login using your account
- `firebase init` => init the project setup
- `firebase deploy` => deploy! done!

## Planning React
1. Component Tree / Component Structure
2. Aplication State (Data)
 - what's data we needed?
3. Components vs Container 
 - Stateless / functional component?
 - or Stateful Component?

 ---

 ## Rangkuman belajar

 ### Pengguaan High Order Component (hoc)
 penting sekali untuk implement `hoc` pada workflownya react. `hoc` sendiri berfungsi untuk _wrapping_ component pada react agara style yang dibuat tidak rusak. 

 > Ingat! Dalam satu component, react hanya memperbolehkan satu root element
 
 Dalam kasus Layout misalkan. Layout.js memiliki beberapa component didalamnya seperti `Toolbar`, `Sidebar` serta `Main` component. Jika penggunaannya `div`, bisa jadi style yang kita buat berantakan, maka dibuatkan `hoc` dengan model functional component pada `Aux/Aux.js`.
```js
const aux = (props) => props.children;

export default aux;
```
implementnya
```js
  render () {
    return (
      <Aux>
        <Toolbar toggleMenuClicked={this.sideDrawerToggleHandler} />
        <SideBar show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </Aux>
    );
  }
```

### Analisa apa yang perlu di Render oleh React
Penting banget untuk memahami lifecycle dari react. Seperti kasus component `Modal.js` di proyek ini. Secara default, react akan selalu melakukan rendering ulang pada component `Modal.js` ketika ada perubahan di `state`. Padahal, `Modal.js` kita tampilkan hanya pada saat **Order** button ditekan bukan? Maka sebaiknya harus dirender saat order button ditekan saja kan? atau bisa dibilang ketika ada perubahan saja di state `showModal` nya, bukan `ingredient`nya. Oleh karena itu perlu diterapkan `shouldComponentUpdate()`
```js
  /* make sure show is changed before you re-render modal */
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.show !== nextProps.show;
  }
```

> Tentu jika kita menggunakan lifecycle pada React, maka perlu menggunakan Statefull component


masih berlanjut...