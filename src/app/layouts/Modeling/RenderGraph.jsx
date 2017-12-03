import React, {Component} from 'react';
import Graph from 'react-graph-vis';

export default class RenderGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graph: {
        nodes: [],
        edges: [],
      },
      network: null,
    };
    this.options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: "#000000"
      }
    };
    this.events = {
      select: function(event) {
        const { nodes, edges } = event;
      }
    };
    this.network = this.network.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.data)) {
      this.setState({
        graph: {
          nodes: nextProps.data.map((el, i) => ({
            id: i,
            label: el.e.toFixed(2).toString(),
          })),
          edges: nextProps.data.map((el, i) => {
            if (i > 0) {
              return {
                from: nextProps.data.indexOf(el) - 1,
                to: i
              };
            }
          }),
        },
      });
    }
  }
  network(e) {
    this.setState({
      network: e,
    })
  }

  render() {
    const options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: "#000000"
      }
    };
    const events = {
      select: function(event) {
        const { nodes, edges } = event;
      }
    };
    return (
      <Graph
        graph={this.state.graph}
        events={events}
        options={options}
        getNetwork={this.network}
      />);
  }
}