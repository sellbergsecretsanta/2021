import React from 'react';
import './App.css';
import WowClasses from './WowClasses.js';
import WowSpecs from './WowSpecs.js';
import Instances from './Instances.js';
import Tooltip from './Tooltip';

export default class InstanceLoot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      specs: [],
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
    this.getClass();
  }

  resetState() {
    this.setState({
      instances: [],
      activeTooltip: '',
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
      this.getInstanceLoot();
    }
  }

  handleSelectSpec = (selectedSpec) => {
    this.resetState();
    this.setState({selectedSpec: selectedSpec.id});
    this.getInstanceLoot();
  }

  findClass(c) {
    return classes => classes.id === c;
  }
  findSpec(s) {
    return specs => specs.id === s;
  }

  getInstanceLoot() {
    fetch('./data.json')
      .then((response) => response.json())
      .then((responseJson) => {

        //let party = [{class: 1, spec: 1}, {class: 2, spec: 3}, {class: 2, spec: 4}];
        //let party = [{class: this.state.selectedClass, spec: this.state.selectedSpec}];
        let partyItems = [];
        //for (var key in party) {
          //let currentClass = responseJson.find(this.findClass(party[key].class));
          //let currentSpec = currentClass.specs.find(this.findSpec(party[key].spec));

          let currentClass = responseJson.find(classes => classes.id === this.state.selectedClass);
          let currentSpec = currentClass.specs.find(specs => specs.id === this.state.selectedSpec);

          for( let slot in currentSpec.slots ) {
            for ( let item in currentSpec.slots[slot].items) {
              let drop = currentSpec.slots[slot].items[item];
              let partyItem = {
                bossId: drop.bossId,
                itemId: drop.itemId,
                itemName: drop.itemName,
                dropRate: drop.dropRate,
                quality: drop.quality,
                icon: drop.icon,
                tooltip: drop.tooltip,
                stage1: drop.stage1
              }
              if (!drop.bossId) {
                let source = drop.source;
                let craftIcon = "";

                if (['blacksmithing', 'engineering', 'leatherworking', 'tailoring', 'engraving'].includes(drop.source)) {
                  source = "craft";
                  craftIcon = drop.source;
                }
                partyItem.bossId = source;
                partyItem.craftIcon = craftIcon;
                partyItem.dropRate = drop.instance ? drop.instance + ': ' + drop.boss + ' - ' + drop.dropRate : drop.location;
              }
              partyItems.push(partyItem);
            }
          }
        //}

        fetch('./instances.json')
          .then((response) => response.json())
          .then((responseJson) => {
            responseJson.forEach((instance) =>
              instance.bosses.slice().reverse().forEach((boss, index, object) => {
                  partyItems.find(item => item.bossId === boss.id)
                  ? boss.items = partyItems.filter(item => item.bossId === boss.id)
                  : instance.bosses.splice(object.length - 1 - index, 1)

                  instance.nrOfDrops += boss.items.length
                }
              )
            )
            this.setState({
                instances: responseJson
            });
        });
      });
  }

  handleSelectItem = (selectedItem) => {
    this.setState({selectedItem: selectedItem.itemId});
    this.getItem(selectedItem);
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
          <Instances instances={this.state.instances} selectedItem={this.state.selectedItem} handleSelectItem={this.handleSelectItem} />
          <div className="separator"></div>
          <Tooltip tooltip={this.state.activeTooltip} icon={this.state.activeInfo.icon} isLoading={this.state.loading} />
          <div className="separator"></div>
        </div>
      </div>
    );
  }
}
