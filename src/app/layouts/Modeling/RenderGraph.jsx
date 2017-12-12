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
    this.network = this.network.bind(this);
  }

  componentDidMount() {
    const nodes = this.props.data.map((el, i) => ({
        id: i,
        x: el.x * 100,
        y: el.y * 100,
        shape: 'text',
        fixed: {
            x: true,
            y: true,
        },
        physics: false,
        label: el.e.toFixed(2).toString(),
    }));
    const edges = this.props.data.map((el, i) => {
        if (i > 0) {
            return {
                from: this.props.data.indexOf(el) - 1,
                to: i
            };
        }
    }).slice(1);
    this.setState({
        graph: {
            nodes,
            edges,
        },
    }, () => this.state.network.fit());
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.data)) {
      const nodes = nextProps.data.map((el, i) => ({
        id: i,
        x: el.x * 100,
        y: el.y * 100,
        shape: 'text',
        fixed: {
          x: true,
          y: true,
        },
        physics: false,
        label: el.e.toFixed(2).toString(),
      }));
      const edges = nextProps.data.map((el, i) => {
        if (i > 0) {
          return {
            from: nextProps.data.indexOf(el) - 1,
            to: i
          };
        }
      }).slice(1);
      this.setState({
        graph: {
          nodes,
          edges,
        },
      }, () => this.state.network.fit());
    }
  }
  network(e) {
    this.setState({
      network: e,
    });
  }

  render() {
    const options = {
      height: '600px',
      width: `${window.innerWidth}px`,
      edges: {
        dashes: true,
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