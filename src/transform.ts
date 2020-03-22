
import { Red, Node, NodeProperties } from 'node-red';
import { DataTransform } from 'node-json-transform';

interface TransformProps extends NodeProperties {
  map: any;
  mapType: 'json';
}

module.exports = function (RED: Red) {
  function TransformNode (this: Node, config: TransformProps) {
    RED.nodes.createNode(this, config);

    this.on('input', async msg => {
      console.log(JSON.parse(config.map).list);
      msg.payload = await DataTransform(msg.payload, JSON.parse(config.map)).transform({ type: 'my-type' });
      this.send(msg);
    });

  }
  RED.nodes.registerType('transform', TransformNode);
};
