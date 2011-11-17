package org.projecthquery.hadoop;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.filecache.DistributedCache;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import org.projecthquery.js.JavaScriptManager;
import org.projecthquery.js.JavaScriptSource;
import org.projecthquery.js.TypeConverter;

public class JavaScriptMapper extends MapReduceBase implements Mapper<LongWritable, Text, Writable, Writable>{

    private JavaScriptManager jsm;

    @Override
    public void map(LongWritable position, Text rawJson,
            OutputCollector<Writable, Writable> oc, Reporter reporter)
            throws IOException {
        Object patient = jsm.parseJSON(rawJson.toString());
        
        jsm.injectObject("patient", patient);
        jsm.injectObject("$output_collector", oc);
        jsm.evaluate("map(patient);",null);
    }

    @Override
    public void configure(JobConf job) {
       
        List<JavaScriptSource> js = new ArrayList<JavaScriptSource>();
        System.out.println(job.get("map.js"));
        js.add(new JavaScriptSource("map.js", job.get("map.js")));
        js.add(new JavaScriptSource("functions.js", job.get("functions.js")));
        js.add(new JavaScriptSource("emit.js", "function emit(k,v){$mapper.emit(k,v,$output_collector)}"));
        jsm = new JavaScriptManager(js,null);
        jsm.injectObject("$mapper", this);

//        try {
//            Path[] files = DistributedCache.getLocalCacheFiles(job);
//            for (int i = 0; i < files.length; i++) {
//                Path path = files[i];
//                if (path.getName().endsWith(".js")) {
//                    FileReader fr = new FileReader(path.toString());
//                    char[] buff = new char[1024];
//                    StringBuffer sbuff = new StringBuffer();
//                    int length = 0;
//                    while(( length = fr.read(buff)) != -1 ){
//                        sbuff.append(buff, 0, length);
//                    }
//                    js.add(new JavaScriptSource(path.getName(), sbuff.toString()));
//                }
//            }
//        } catch (IOException ioe) {
//            throw new RuntimeException("Couldn't read from DistributedCache", ioe);
//        }

    }
    
    public void emit(Object k, Object v, OutputCollector<Writable, Writable>  oc) throws IOException, InterruptedException{
        System.out.println("Key " + k.getClass().getName() + " " +k.toString() + "  V" + v.getClass().getName() + " " + v.toString());
        Writable ck = TypeConverter.convert(k);
        Writable cv = TypeConverter.convert(v);
        System.out.println("Key " + ck.getClass().getName() + " " +ck.toString() + "  V" + cv.getClass().getName() + " " + cv.toString());
      oc.collect(ck,cv);
    }
}
