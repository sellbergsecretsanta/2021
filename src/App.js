import React from 'react';
import './App.css';
import WowClasses from './WowClasses.js';
import WowSpecs from './WowSpecs.js';
import ItemSlots from './ItemSlots.js';
import Tooltip from './Tooltip';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      specs: [],
      slots: [],
      items: [],
      leftSlotIcons: [],
      rightSlotIcons: [],
      activeTooltip: '',
      activeInfo: '',
      selectedClass: '',
      selectedSpec: '',
      selectedItem: '',
      loading: false
    };
  }

  componentDidMount() {
    this.getClass();
    this.getSlots();

    //this.test();
  }

  findClass(c) {
    return classes => classes.id === c;
  }
  findSpec(s) {
    return specs => specs.id === s;
  }

  test() {
    fetch('./data.json')
      .then((response) => response.json())
      .then((responseJson) => {

        let party = [{class: 1, spec: 1}, {class: 2, spec: 3}, {class: 2, spec: 4}];
        let partyItems = [];
        for (var key in party) {
          let currentClass = responseJson.find(this.findClass(party[key].class));
          let currentSpec = currentClass.specs.find(this.findSpec(party[key].spec));

          for( let slot in currentSpec.slots ) {
            for ( let item in currentSpec.slots[slot].items) {
              let drop = currentSpec.slots[slot].items[item];
              if (drop.bossId) {
                let partyItem = {
                  bossId: drop.bossId,
                  itemId: drop.itemId,
                  itemName: drop.name,
                  quality: drop.quality,
                  icon: drop.icon,
                  specIcon: currentSpec.img
                }
                partyItems.push(partyItem);
              }
              //partyItems.push(currentSpec.slots[slot].items[item]);
            }
          }
        }

        console.log(partyItems);


        /*const items = [];
        for( let prop in currentSpec.slots ) {
            items.push(currentSpec.slots[prop]);
        }

        this.setState({
            items: items
        });*/
      });
  }

  resetState() {
    this.setState({
      items: [],
      activeTooltip: '',
      activeInfo: '',
      selectedSpec: '',
      selectedItem: ''
    });
  }

  getClass() {
    fetch('./data.json')
      .then((response) => response.json())
      .then((responseJson) => {

        let classes = [];
        for( let prop in responseJson ) {
          classes.push(responseJson[prop]);
        }
        this.setState({
          classes: classes
        });
      });
  }

  handleSelectClass = (selectedClass) => {
    this.resetState();
    this.setState({selectedClass: selectedClass.id});
    this.getSpecs(selectedClass.specs);
  }

  getSpecs(specs) {
    this.setState({
      specs: specs
    });

    if (specs.length === 1) {
      this.setState({selectedSpec: specs[0].id});
      this.getItems();
    }
  }

  handleSelectSpec = (selectedSpec) => {
    this.resetState();
    this.setState({selectedSpec: selectedSpec.id});
    this.getItems();
  }

  getSlots() {
    fetch('./slots.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
           slots: responseJson
        });
      });
  }

  getItems() {
    fetch('./data.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let currentClass = responseJson.find(classes => classes.id === this.state.selectedClass);
        let currentSpec = currentClass.specs.find(specs => specs.id === this.state.selectedSpec);

        const items = [];
        for( let prop in currentSpec.slots ) {
            items.push(currentSpec.slots[prop]);
        }

        this.setState({
            items: items
        });
      });
  }

  handleSelectItem = (selectedItem) => {
    this.setState({selectedItem: selectedItem.itemId});
    this.getItem(selectedItem);
  }

  toggleLoading(state) {
    this.setState({
        loading: state,
        activeTooltip: '',
        activeInfo: ''
    });
  }

  fixTooltip(str) {
    str = str.replace(/\\/g, '');
    str = str.replace(/href="(.*?)"/g, '');
    str = str.replace('<table width="100%">', '<table width="100%"><tbody>');
    str = str.replace('<table><tr><td><b', '<table class="shrink"><tbody><tr><td><table width="100%"><tbody><tr><td><b');
    str = str.replace('</th></tr></table>', '</th></tr></tbody></table>');
    str = str.replace('</td></tr></table><table>', '</td></tr></tbody></table><table><tbody>');
    str = str.replace('></td></tr></table>', '></td></tr></tbody></table></td><th style="background-position: right top;"></th></tr><tr><th style="background-position: left bottom;"></th><th style="background-position: right bottom;"></th></tr></tbody></table>');

    return str;
  }

  getItem(item) {
    this.setState({
      activeTooltip: item.tooltip,
      activeInfo: item
    })
  }

  render() {
    return (
      <div className="App">
        <WowClasses classes={this.state.classes} selectedClass={this.state.selectedClass} handleSelectClass={this.handleSelectClass} />
        <WowSpecs specs={this.state.specs} selectedSpec={this.state.selectedSpec} handleSelectSpec={this.handleSelectSpec} />
        <div className="flexBox">
          <ItemSlots slots={this.state.slots} items={this.state.items} selectedItem={this.state.selectedItem} handleSelectItem={this.handleSelectItem} />
          <div className="separator"></div>
          <Tooltip tooltip={this.state.activeTooltip} info={this.state.activeInfo} isLoading={this.state.loading} />
          <div className="separator"></div>
        </div>
      </div>
    );
  }
}
