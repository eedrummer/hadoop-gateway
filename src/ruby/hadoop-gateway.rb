java_require "org.apache.hadoop.mapred.JobClient"
java_require "org.projecthquery.hadoop"
java_require "org.projecthquery.js"


class HadoopQueryExecutor
  include QueryUtilities
  def initialize(map_js, reduce_js, functions_js, query_id, filter={})
     @map_js = map_js
     @reduce_js = reduce_js
     @query_id = query_id
     @filter = filter
     @functions_js = functions_js
   end
   
   def execute
     conf = Configuration.new
     job = JobConf.new(conf, HadoopGateway)
     job.setJobName("Query #{@query_id} MR job")
     job.mapperClass = JavaScriptMapper
     job.reducerClass = JavaScriptReducer
     
     conf.setString("map_js", @map_js)
     conf.setString("reduce_js", @reduce_js)
     conf.setString("filter", @filter)
     conf.setString("functions_js", "#{@functions_js}\n#{QueryUtilities.patient_api_javascript}")
     JobClient.runJob(job)
   end
  
end


require 'rubygems'
 require 'java'
 require 'find'
 
 Find.find(File.expand_path('lib')) do |path|
   require path if path.match(/\.jar$/)
 end
 
include org.apache.hadoop.mapred
include org.apache.hadoop.conf


class A < MapReduceBase
  
  include Mapper
  include Reducer
  
  def map(k,v,o,r)
    
  end
  
  def reduce(k,v,o,r)
    
  end
  
  
end


conf = Configuration.new
conf.mapperClass = A
conf.reducerClass = A
conf.jobName = "JOBBY"
JobClient.runJob(conf)

