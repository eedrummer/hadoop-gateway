package org.projecthquery.js;

public class JavaScriptSource {
    private String fileName;
    private String source;

    public JavaScriptSource(String fileName, String source) {
        this.fileName = fileName;
        this.source = source;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
}
