package org.projecthquery.hadoop;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reducer;
import org.apache.hadoop.mapred.Reporter;
import org.projecthquery.js.JavaScriptManager;
import org.projecthquery.js.JavaScriptSource;

public class JavaScriptReducer extends JavaScriptMRBase implements Reducer<Writable, Writable,Writable, Writable>{
    private JavaScriptManager jsm;

    @Override
    public void configure(JobConf job) {
        List<JavaScriptSource> js = setUpSource(job);
        jsm = new JavaScriptManager(js,null);
        jsm.injectObject("$mapper", this);
    }

    @Override
    public void reduce(Writable key, Iterator<Writable> values,
            OutputCollector<Writable, Writable> oc, Reporter reporter)
            throws IOException {
        // TODO: Currently only works with Text/Double pairs
        ArrayList<Double> castValues = new ArrayList<Double>();
        while (values.hasNext()) {
            DoubleWritable doubleWritable = (DoubleWritable) values.next();
            castValues.add(doubleWritable.get());
        }
        jsm.injectObject("$output_collector", oc);
        jsm.injectObject("key", ((Text) key).toString());
        jsm.injectObject("values", castValues);
        jsm.evaluate("reduce(key, values);", null);
    }
}