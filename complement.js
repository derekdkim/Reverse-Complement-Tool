// Pairing Rules -- Added N as it is often present in sequencing reads and removing a letter altogether may cause unwanted frameshift.
let nucCode = ['A', 'T', 'G', 'C', 'U', 'N'];
let DNAPair = { 'A':'T', 'T':'A', 'G':'C', 'C':'G', 'N':'N'};
let RNAPair = { 'A':'U', 'U':'A', 'G':'C', 'C':'G', 'N':'N'};

// Trim sequence into a consistent format
const cleanSeq = (seq) => {
    
    // Remove spaces and split
    let spacelessSeq = seq.trim();
    let seqArr = spacelessSeq.split('');

    // Filter out anything other than DNA or RNA sequences
    let cleanArr = seqArr.filter(i => nucCode.includes(i));

    return cleanArr.join('');
}

// Determine if the sequence is DNA or RNA.
const isRNA = (seq) => {
    if (seq.search(/[U]/) !== -1) {
        return true;
    } else {
        return false;
    }
}

// Complement method
const complementSeq = (seq) => {

    let seqArr = seq.split('');

    if (isRNA(seq)) {
        // RNA Pairing Rules
        let compArr = seqArr.map(base => RNAPair[base]);
        return compArr.join('');
    } else {
        // DNA Pair Rules
        let compArr = seqArr.map(base => DNAPair[base]);
        return compArr.join('');
    }
}

// Reverse method
const reverseSeq = (seq) => {

    let seqArr = seq.split('');
    revArr = [];

    for(let x = seqArr.length - 1; x >= 0; x--) {
        revArr.push(seqArr[x]);
    }

    return revArr.join('');
}

// Main method
const main = () => {
    // Obtain sequence
    let seq = document.getElementById('input-field').value;

    if (seq.length === 0 || null) {
        document.getElementById('output-field').value = "Please enter a DNA or RNA sequence.";
        return 0;
    }
    

    // Clean sequence
    let cSeq = cleanSeq(seq);

    // Reverse sequence
    let revSeq = reverseSeq(cSeq);

    // Complement seq
    let compSeq = complementSeq(revSeq);

    // Display output
    document.getElementById('output-field').value = compSeq;

}

// Clean-only method
const cleanIt = () => {
    // Obtain sequence
    let seq = document.getElementById('input-field').value;

    // Clean seq
    let cleanedSeq = cleanSeq(seq);

    // Display output
    document.getElementById('output-field').value = cleanedSeq;
}