package org.projecthquery.hadoop;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.filecache.DistributedCache;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.projecthquery.js.JavaScriptSource;
import org.projecthquery.js.TypeConverter;

import com.google.common.io.Files;

public class JavaScriptMRBase extends MapReduceBase {
    public void emit(Object k, Object v, OutputCollector<Writable, Writable>  oc) throws IOException, InterruptedException{
        Writable ck = TypeConverter.convert(k);
        Writable cv = TypeConverter.convert(v);
        oc.collect(ck,cv);
    }
    
    public List<JavaScriptSource> setUpSource(JobConf job) {
        List<JavaScriptSource> js = new ArrayList<JavaScriptSource>();
        js.add(new JavaScriptSource("emit.js", "function emit(k,v){$mapper.emit(k,v,$output_collector)}"));

        try {
            Path[] files = DistributedCache.getLocalCacheFiles(job);
            for (int i = 0; i < files.length; i++) {
                Path path = files[i];
                if (path.getName().endsWith(".js")) {
                    String source = Files.toString(new File(path.toString()), Charset.forName("UTF-8"));
                    js.add(new JavaScriptSource(path.getName(), source));
                }
            }
        } catch (IOException ioe) {
            throw new RuntimeException("Couldn't read from DistributedCache", ioe);
        }
        return js;
    }
}
