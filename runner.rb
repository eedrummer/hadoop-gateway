# A very basic script to run a Hadoop job. Will load JavaScript files from src/javascript directory

js_files = Dir.glob('src/javascript/*.js').join(',')
jars = Dir.glob('lib/*.jar').reject {|n| n.include?('javadoc') || n.include?('sources') || n.include?('junit')}.join(',')
`/usr/local/hadoop/bin/hadoop jar dist/hadoop-gateway.jar org.projecthquery.hadoop.HadoopQueryExecutor -files #{js_files} -libjars dist/hadoop-gateway.jar,#{jars} foo bar`
