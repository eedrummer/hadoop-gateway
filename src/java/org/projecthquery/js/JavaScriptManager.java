package org.projecthquery.js;

import java.util.Iterator;
import java.util.List;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

public class JavaScriptManager {
    private Context context;
    private Scriptable scope;

    public JavaScriptManager(List<JavaScriptSource> scripts) {
        context = Context.enter();
        scope = context.initStandardObjects();
        
        for (Iterator<JavaScriptSource> i = scripts.iterator(); i.hasNext();) {
            JavaScriptSource javaScriptSource = i.next();
            context.evaluateString(scope, javaScriptSource.getSource(),
                                   javaScriptSource.getFileName(), 1, null);
            
        }
    }
    
    public void destroy() {
        Context.exit();
    }
}
