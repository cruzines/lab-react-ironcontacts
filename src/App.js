import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json";
import { useState } from "react";



function App() {

  let [allContacts, setContacts] = useState(contacts.slice(0,5));

  function handleAdd() {
    let randomContact = contacts[Math.floor(Math.random()*contacts.length)];
    let newContact = [randomContact, ...allContacts]
    setContacts(newContact);
  }

  function handleSortByPopularity() {
    let contactsClone = JSON.parse(JSON.stringify(allContacts))
    contactsClone.sort((first, second) => {
      if (first.popularity > second.popularity) {
        return -1
      } else if (first.popularity < second.popularity) {
        return 1
      } else {
        return 0
      }
    })
    setContacts(contactsClone);
  }

  function handleSortByName() {
    let contactsClone = JSON.parse(JSON.stringify(allContacts));
    contactsClone.sort((first, second) => {
      if (first.name > second.name) {
        return 1;
      } else if (first.name < second.name) {
        return -1;
      } else {
        return 0;
      }
    });
    setContacts(contactsClone);
  }

  function handleDelete(id) {
    let filteredContacts = allContacts.filter(contact => {
      return contact.id !== id;
    });
    setContacts(filteredContacts);
  }

  return (
    <div className="App">
      <button onClick={handleAdd}>Add Random Contact</button>
      <button onClick={handleSortByPopularity}>Sort By Popularity</button>
      <button onClick={handleSortByName}>Sort By Name</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
        {allContacts.map(contact => {
          return (
            <>
            <tr>
            <td><img style={{width:"100px"}} src={contact.pictureUrl} alt='pic' /></td>
              <td>{contact.name}</td>
              <td>{Math.round(contact.popularity * 100) / 100}</td>
              <td>{contact.wonOscar ? '🏆': ''}</td>
              <td>{contact.wonEmmy ? '🏆': ''}</td>
              <td><button onClick={() => handleDelete(contact.id)}>Delete</button></td>
            </tr>
            </>
          )
        })}
      </table>
    </div>
  );
}

export default App;
