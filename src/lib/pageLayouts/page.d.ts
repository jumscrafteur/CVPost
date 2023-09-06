type pageData = {
    layout: 'PHMB' | 'PMB';
    mainColor: string;
    textColor: string;
    misc: {
        contact: {
            phone: string;
            adresse: string;
            mail: string;
            github: string;
        }
        qualities: string[];
        other: string[];

    }
    header: {
        title: string;
        subTitle: string;
        paragraph: string;
    };
    sections: section[];
};