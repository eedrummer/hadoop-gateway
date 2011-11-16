package org.projecthquery.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

public class HadoopQueryExecutor {
    private String map_js;
    private String reduce_js;
    private String functions_js;
    private String filter;
    private String queryId;
    public HadoopQueryExecutor(String map_js, String reduce_js,
            String functions_js, String filter, String queryId) {
        super();
        this.map_js = map_js;
        this.reduce_js = reduce_js;
        this.functions_js = functions_js;
        this.filter = filter;
        this.queryId = queryId;
        }
    
    public Object execute() throws Exception{
        Configuration conf = new Configuration();
        Job job = new Job(conf, "wordcount");
        
        job.setOutputKeyClass(Writable.class);
        job.setOutputValueClass(Writable.class);

       
        job.setInputFormatClass(TextInputFormat.class);
        job.setOutputFormatClass(TextOutputFormat.class);
    
        FileInputFormat.addInputPath(job, new Path("in"));
        FileOutputFormat.setOutputPath(job, new Path("out"));

        job.setMapperClass(JavaScriptMapper.class);
        job.setReducerClass( JavaScriptReducer.class);
        job.getConfiguration().set("map_js", this.map_js);
        job.getConfiguration().set("reduce_js", this.reduce_js);
        job.getConfiguration().set("functions_js", this.functions_js);
        job.getConfiguration().set("filter", this.filter);
        job.getConfiguration().set("query_id", this.queryId);

        job.waitForCompletion(true);
        return null;
	}
}
