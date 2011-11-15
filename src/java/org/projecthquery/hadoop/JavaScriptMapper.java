package org.projecthquery.hadoop;

import java.io.FileReader;
import java.io.IOException;

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

public class JavaScriptMapper extends MapReduceBase implements Mapper<LongWritable, Text, Writable, Writable>{

    private JavaScriptManager jsm;

    @Override
    public void map(LongWritable position, Text rawJson,
            OutputCollector<Writable, Writable> oc, Reporter reporter)
            throws IOException {
        Object patient = jsm.parseJSON(rawJson.toString());
        jsm.injectObject("patient", patient);
        jsm.evaluate("map(patient);");
    }

    @Override
    public void configure(JobConf job) {
        try {
            Path[] files = DistributedCache.getLocalCacheFiles(job);
            for (int i = 0; i < files.length; i++) {
                Path path = files[i];
                if (path.getName().endsWith(".js")) {
                    FileReader fr = new FileReader(path.toString());
                    // TODO: read the file and create a JavaScriptSource object
                }
            }
        } catch (IOException ioe) {
            throw new RuntimeException("Couldn't read from DistributedCache", ioe);
        }
    }
}
