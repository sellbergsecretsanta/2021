import React from 'react';
import './App.css';
import Instances from './Instances.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instances: [],
      activeTooltip: '',
      activeInfo: '',
      selectedClass: '',
      selectedSpec: '',
      selectedItem: '',
      loading: false
    };
  }

  componentDidMount() {
    this.test();
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
                  itemName: drop.itemName,
                  dropRate: drop.dropRate,
                  quality: drop.quality,
                  icon: drop.icon,
                  specIcon: currentSpec.img
                }
                let duplicate = partyItems.find(item => item.itemId === drop.itemId);
                if (duplicate) {
                  duplicate.specIcon2 = currentSpec.img;
                } else {
                  partyItems.push(partyItem);
                }
              }
            }
          }
        }

        //console.log(partyItems);
        fetch('./instances.json')
          .then((response) => response.json())
          .then((responseJson) => {
            responseJson.forEach((instance) =>
              instance.bosses.slice().reverse().forEach((boss, index, object) =>
                partyItems.find(item => item.bossId === boss.id)
                ? boss.items = partyItems.filter(item => item.bossId === boss.id)
                : instance.bosses.splice(object.length - 1 - index, 1)
              )
            )
            //console.log(responseJson);
            this.setState({
                instances: responseJson
            });
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Instances instances={this.state.instances} />
      </div>
    );
  }
}
