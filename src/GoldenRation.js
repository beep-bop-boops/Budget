const GR = (textsize) => {

    var initialsize = 9

    let ar = [0,
        initialsize,
        initialsize/1.6180,
        initialsize/(1.6180*2),
        initialsize/(1.6180*3),
        initialsize/(1.6180*4),
        initialsize/(1.6180*5),
        initialsize/(1.6180*6),
        initialsize/(1.6180*7),
        initialsize/(1.6180*8),
    ]

    /*
    
    ar[2] = initialsize/1.6180
    ar[3] = initialsize/(1.6180*2)
    ar[3] = initialsize/(1.6180*3)
*/
    return ar[textsize];

    
}

export {GR};