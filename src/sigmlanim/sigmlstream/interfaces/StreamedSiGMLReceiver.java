package sigmlanim.sigmlstream.interfaces;

import sigmlanim.AnimatedSign;
import sigmlgen.playerctrl.PlayerSettings;

public abstract interface StreamedSiGMLReceiver
{
  public abstract void beginSignStream();
  
  public abstract void setNewPlayerSettings(PlayerSettings paramPlayerSettings);
  
  public abstract void setNextSign(String paramString1, String paramString2);
  
  public abstract void setNextSignWithAnim(AnimatedSign paramAnimatedSign);
  
  public abstract void endSignStream();
  
  public abstract void addStreamAbortCheckpoint();
  
  public abstract void abortCurrentSiGMLStream();
  
  public abstract void clearStreamAbortCheckpoint();
}


