#include "ppapi/cpp/instance.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/var.h"

/// The Instance class.  One of these exists for each instance of your NaCl
/// module on the web page.  The browser will ask the Module object to create
/// a new Instance for each occurrence of the <embed> tag that has these
/// attributes:
///     src="pnacl_qs.nmf"
///     type="application/x-pnacl"
class PnaclQuickstartInstance : public pp::Instance {
 public:
  /// The constructor creates the plugin-side instance.
  /// @param[in] instance the handle to the browser-side plugin instance.
  explicit PnaclQuickstartInstance(PP_Instance instance) : pp::Instance(instance) {
      PostMessage("Module instance created");
  }
  virtual ~PnaclQuickstartInstance() {}

  virtual void HandleMessage(const pp::Var& var_message) {
    if (!var_message.is_string()) return;

    std::string message = var_message.AsString();
    pp::Var var_reply;
    if (message == "hello") {
      var_reply = pp::Var("Hi from PNACl");
      PostMessage(var_reply);
    }
  }
};

class PnaclQuickstartModule : public pp::Module {
 public:
  PnaclQuickstartModule() : pp::Module() {}
  virtual ~PnaclQuickstartModule() {}

  /// Create and return a PnaclQuickstartInstance object.
  /// @param[in] instance The browser-side instance.
  /// @return the plugin-side instance.
  virtual pp::Instance* CreateInstance(PP_Instance instance) {
    return new PnaclQuickstartInstance(instance);
  }
};

namespace pp {
Module* CreateModule() {
  return new PnaclQuickstartModule();
}
}  // namespace pp
