package org.projecthquery.hadoop;

import java.io.IOException;
import java.util.List;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.JobConf;

import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import org.projecthquery.js.JavaScriptManager;
import org.projecthquery.js.JavaScriptSource;

public class JavaScriptMapper extends JavaScriptMRBase implements Mapper<Writable, Text, Writable, Writable>{

    private JavaScriptManager jsm;

    @Override
    public void map(Writable position, Text rawJson,
            OutputCollector<Writable, Writable> oc, Reporter reporter)
            throws IOException {
        Object patient = jsm.parseJSON(rawJson.toString());
        
        jsm.injectObject("rawPatient", patient);
        jsm.injectObject("$output_collector", oc);
        jsm.evaluate("var patient = new hQuery.Patient(rawPatient);", null);
        jsm.evaluate("map(patient);", null);
    }

    @Override
    public void configure(JobConf job) {
       
        List<JavaScriptSource> js = setUpSource(job);
        jsm = new JavaScriptManager(js,null);
        jsm.injectObject("$mapper", this);
    }
}
