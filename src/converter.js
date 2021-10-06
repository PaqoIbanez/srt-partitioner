const parseSRT = require('parse-srt');
const {srtTimestamp, toSeconds} = require('./utils.js');
const fs = require('fs'); 

const app = () =>{
    fs.readdir('./to_convert', (err, files) => {
        if (err) throw err; 
        for (let i = 0; i < (files.length / 2); i++) {
            const fileNames = `Iteration #2 - Lecture #${i+1}`;
            exportNewSRTs(fileNames)
        }
    });
}

const exportNewSRTs = (fileName) => {
    let markers = [];
    let titles = [];

    fs.readFile(`./to_convert/${fileName}.rtf`, 'utf8', (err, data) => { 
        if (err) throw err; 
    
        const dir = './subtitles';
    
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        
        data.match(/([0-5]?\d)([0-5]?\d):([0-5]?\d)([0-5]?\d):([0-5]?\d)([0-5]?\d)/g).forEach(marker => {
            const markerInSeconds = toSeconds(marker.replace(/[\[\]']+/g,'')+',000');
            markers.push(markerInSeconds);
        });
    
        data.match(/(?<=\]\s)(.*?)(?=\\)/g).forEach(element => {
            titles.push(element.replace(':',' -'));
        });

        fs.readFile(`./to_convert/${fileName}.srt`, 'utf8', (err, data) => {
            if (err) throw err;
            const jsonSubs = parseSRT(data);
            
            markers.forEach((marker, i) => {
                let arr = [];
                let srt = "";
                markers.push(100000);
                jsonSubs.forEach(sub => {
                    sub.start < markers[i+1] && sub.start >= marker ? arr.push(sub) : false;
                }); 
                
                arr.forEach((sub, i) => {
                    const start = srtTimestamp((sub.start -  marker).toFixed(3)); 
                    const end = srtTimestamp((sub.end -  marker).toFixed(3)); 
                    srt += `${i+1} 
${start} --> ${end} 
${(sub.text).replace('<br />','\n')}

`;
                    }); 
                fs.writeFileSync(`./subtitles/${titles[i]}.srt`, srt);

            });
        });
    });
}

module.exports = {
    app,
}