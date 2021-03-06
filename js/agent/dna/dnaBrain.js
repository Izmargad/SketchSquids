const DNABrain = function(
    inputs = [],
    neurons = DNABrain.makeNeurons(DNABrain.DEFAULT_NEURON_COUNT),
    outputs = [new DNANeuron(), new DNANeuron()],
    axons = DNABrain.makeAxons(DNABrain.DEFAULT_NEURON_COUNT, 2)) {
    this.inputs = inputs;
    this.neurons = neurons;
    this.outputs = outputs;
    this.axons = axons;
};

DNABrain.DEFAULT_NEURON_COUNT = 6;
DNABrain.DEFAULT_AXON_CHANCE = 1;

DNABrain.makeNeurons = function(count) {
    const neurons = new Array(count);

    for (let i = 0; i < neurons.length; ++i)
        neurons[i] = new DNANeuron();

    return neurons;
};

DNABrain.makeAxons = function(neuronCount, outputCount) {
    const axons = [];

    for (let neuron = 0; neuron < neuronCount; ++neuron) {
        for (let other = 0; other < neuronCount; ++other) {
            if (other === neuron)
                continue;

            if (Math.random() > DNABrain.DEFAULT_AXON_CHANCE)
                continue;

            axons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                other | DNAAxon.FLAG_NEURON));
        }

        for (let output = 0; output < outputCount; ++output)
            axons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                output | DNAAxon.FLAG_OUTPUT));
    }

    return axons;
};

DNABrain.prototype.copy = function() {
    const inputs = [];
    const neurons = [];
    const outputs = [];
    const axons = [];

    for (const input of this.inputs)
        inputs.push(input.copy());

    for (const neuron of this.neurons)
        neurons.push(neuron.copy());

    for (const output of this.outputs)
        outputs.push(output.copy());

    for (const axon of this.axons)
        axons.push(axon.copy());

    return new DNABrain(
        inputs,
        neurons,
        outputs,
        axons);
};