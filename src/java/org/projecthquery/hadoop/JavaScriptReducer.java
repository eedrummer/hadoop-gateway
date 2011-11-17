package org.projecthquery.hadoop;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import org.apache.hadoop.mapreduce.Reducer;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.projecthquery.js.JavaScriptManager;
import org.projecthquery.js.JavaScriptSource;
import org.projecthquery.js.TypeConverter;

public class JavaScriptReducer extends MapReduceBase implements org.apache.hadoop.mapred.Reducer<Writable, Writable,Writable, Writable>{
    private JavaScriptManager jsMan;
    
    
    @Override
    public void close() throws IOException {
        // TODO Auto-generated method stub
        super.close();
    }

    @Override
    public void configure(JobConf job) {
        // TODO Auto-generated method stub
        super.configure(job);
        List<JavaScriptSource> js = new ArrayList<JavaScriptSource>();
        js.add(new JavaScriptSource("reduce.js", job.get("reduce_js")));
        js.add(new JavaScriptSource("functions.js", job.get("functions_js")));
        jsMan = new JavaScriptManager(js,null);
        
    }

    @Override
    public void reduce(Writable key, Iterator<Writable> values,
            OutputCollector<Writable, Writable> oc, Reporter reporter)
            throws IOException {
      Function red = (Function)jsMan.getFunction("reduce");
      Scriptable scope = jsMan.getScope();
      org.mozilla.javascript.Context jsCtx = jsMan.getContext();
      Object v = red.call(jsCtx, scope, scope, new Object[]{key,values});
      oc.collect(key, TypeConverter.convert(v));
        
    }



}