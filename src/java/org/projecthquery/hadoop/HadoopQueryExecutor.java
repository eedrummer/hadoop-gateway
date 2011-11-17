package org.projecthquery.hadoop;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;

public class HadoopQueryExecutor {
    private String mapJs;
    private String reduceJs;
    private String functionsJs;
    private String filter;
    private String queryId;
    
    public HadoopQueryExecutor(String mapJs, String reduceJs,
            String functionsJs, String filter, String queryId) {
        super();
        this.mapJs = mapJs;
        this.reduceJs = reduceJs;
        this.functionsJs = functionsJs;
        this.filter = filter;
        this.queryId = queryId;
        }
    
    public Object execute() throws Exception{
        
         JobConf conf = new JobConf();
         JobClient c = new JobClient(conf);
         conf.set("map.js", mapJs);
         conf.set("reduce.js", reduceJs);
         conf.set("filter", filter);
         conf.set("functions.js", functionsJs);
         conf.set("query_id", queryId);
         
         conf.setMapperClass(JavaScriptMapper.class);
         conf.setReducerClass(JavaScriptReducer.class);
         conf.setMapOutputKeyClass(Writable.class);
         conf.setMapOutputValueClass(Writable.class);
        
//        Job job = new Job(conf, "wordcount");
//        
//        job.setOutputKeyClass(Writable.class);
//        job.setOutputValueClass(Writable.class);
//
//       
//        job.setInputFormatClass(TextInputFormat.class);
//        job.setOutputFormatClass(TextOutputFormat.class);
//    
        FileInputFormat.addInputPath(conf, new Path("in"));
        FileOutputFormat.setOutputPath(conf, new Path("out"));
//
//        job.setMapperClass(JavaScriptMapper.class);
//        job.setReducerClass( JavaScriptReducer.class);
//        job.getConfiguration().set("map_js", this.map_js);
//        job.getConfiguration().set("reduce_js", this.reduce_js);
//        job.getConfiguration().set("functions_js", this.functions_js);
//        job.getConfiguration().set("filter", this.filter);
//        job.getConfiguration().set("query_id", this.queryId);
//
  //      job.waitForCompletion(true);
        return JobClient.runJob(conf);
	}
}
