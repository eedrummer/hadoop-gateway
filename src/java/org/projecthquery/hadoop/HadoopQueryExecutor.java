package org.projecthquery.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;

public class HadoopQueryExecutor implements Tool {

    private Configuration configuration;
    
    public HadoopQueryExecutor() {
    }
    
    public static void main(String[] args) throws Exception
    {
        // Let ToolRunner handle generic command-line options 
        int res = ToolRunner.run(new Configuration(), new HadoopQueryExecutor(), args);
        
        System.exit(res);
    }

    @Override
    public Configuration getConf() {
        return configuration;
    }

    @Override
    public void setConf(Configuration configuration) {
        this.configuration = configuration;
    }

    @Override
    public int run(String[] args) throws Exception {
        Configuration conf = getConf();
        JobConf jobConf = new JobConf(conf);
        
        jobConf.set("filter", args[0]);
        jobConf.set("query_id", args[1]);
        
        jobConf.setMapperClass(JavaScriptMapper.class);
        jobConf.setReducerClass(JavaScriptReducer.class);
        // TODO: Need to generalize these output classes
        jobConf.setOutputKeyClass(Text.class);
        jobConf.setOutputValueClass(DoubleWritable.class);
        
        FileInputFormat.addInputPath(jobConf, new Path("patients"));
        FileOutputFormat.setOutputPath(jobConf, new Path("out"));
        
        JobClient.runJob(jobConf);
        return 0;
    }
}
