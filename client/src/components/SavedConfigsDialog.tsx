import { useState, useEffect } from "react";
import { Folder, Clock, Edit2, Save, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  SavedConfiguration,
  ComputeRequirements, 
  UsagePattern, 
  PlatformSelections 
} from "@shared/types";

interface SavedConfigsDialogProps {
  computeRequirements: ComputeRequirements;
  usagePattern: UsagePattern;
  platformSelections: PlatformSelections;
  onLoadConfiguration: (config: SavedConfiguration) => void;
}

export default function SavedConfigsDialog({
  computeRequirements,
  usagePattern,
  platformSelections,
  onLoadConfiguration
}: SavedConfigsDialogProps) {
  const [open, setOpen] = useState(false);
  const [configs, setConfigs] = useState<SavedConfiguration[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [configName, setConfigName] = useState("");
  const [configDescription, setConfigDescription] = useState("");
  const { toast } = useToast();

  // Fetch saved configs when dialog opens
  useEffect(() => {
    if (open) {
      fetchConfigurations();
    }
  }, [open]);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const response = await apiRequest({
        url: "/api/configurations",
        method: "GET",
      });
      setConfigs(response as SavedConfiguration[]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch saved configurations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveConfiguration = async () => {
    if (!configName.trim()) {
      toast({
        title: "Error",
        description: "Configuration name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        name: configName,
        description: configDescription,
        computeRequirements,
        usagePattern,
        platformSelections,
      };

      if (editMode) {
        // Update existing configuration
        await apiRequest({
          url: `/api/configurations/${editMode}`,
          method: "PUT",
          body: payload,
        });
        toast({
          title: "Success",
          description: "Configuration updated successfully",
        });
      } else {
        // Create new configuration
        await apiRequest({
          url: "/api/configurations",
          method: "POST",
          body: payload,
        });
        toast({
          title: "Success",
          description: "Configuration saved successfully",
        });
      }

      // Reset form and refresh configurations
      setConfigName("");
      setConfigDescription("");
      setSaveDialogOpen(false);
      setEditMode(null);
      fetchConfigurations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive",
      });
    }
  };

  const deleteConfiguration = async (id: string) => {
    try {
      await apiRequest({
        url: `/api/configurations/${id}`,
        method: "DELETE",
      });
      toast({
        title: "Success",
        description: "Configuration deleted successfully",
      });
      fetchConfigurations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete configuration",
        variant: "destructive",
      });
    }
  };

  const startEdit = (config: SavedConfiguration) => {
    setEditMode(config.id);
    setConfigName(config.name);
    setConfigDescription(config.description || "");
    setSaveDialogOpen(true);
  };

  const renderConfigCard = (config: SavedConfiguration) => {
    // Format date string for display
    const date = new Date(config.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Get platform count
    const platformCount = config.platformSelections.selectedPlatforms.length;

    return (
      <Card key={config.id} className="mb-4 border border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{config.name}</CardTitle>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => startEdit(config)}
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-destructive hover:text-destructive/90" 
                onClick={() => deleteConfiguration(config.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <CardDescription className="text-xs flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1" /> Created {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm pb-2">
          {config.description && <p className="text-gray-600 mb-3">{config.description}</p>}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p><strong>CPU:</strong> {config.computeRequirements.cpuCount} cores</p>
              <p><strong>Memory:</strong> {config.computeRequirements.memorySize} GB</p>
              <p><strong>Storage:</strong> {config.computeRequirements.storageSize} GB</p>
            </div>
            <div>
              <p><strong>Usage:</strong> {config.usagePattern.hoursPerDay} hrs/day, {config.usagePattern.daysPerMonth} days/month</p>
              <p><strong>Interruptible:</strong> {config.usagePattern.isInterruptible ? "Yes" : "No"}</p>
              <p><strong>Platforms:</strong> {platformCount} selected</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full" 
            onClick={() => {
              onLoadConfiguration(config);
              setOpen(false);
            }}
          >
            Load Configuration
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <Folder className="mr-1 h-4 w-4" />
            Saved Configs
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Saved Configurations</DialogTitle>
            <DialogDescription>
              Load previously saved configurations or save your current settings.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="saved" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="saved">Saved Configurations</TabsTrigger>
              <TabsTrigger value="current">Current Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved" className="mt-4">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading saved configurations...</p>
                </div>
              ) : configs.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-md border-gray-300">
                  <p className="text-gray-500 mb-2">No saved configurations yet</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditMode(null);
                      setConfigName("");
                      setConfigDescription("");
                      setSaveDialogOpen(true);
                    }}
                  >
                    <Save className="mr-1 h-4 w-4" />
                    Save Current Configuration
                  </Button>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex justify-end mb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditMode(null);
                        setConfigName("");
                        setConfigDescription("");
                        setSaveDialogOpen(true);
                      }}
                    >
                      <Save className="mr-1 h-4 w-4" />
                      Save Current Configuration
                    </Button>
                  </div>
                  {configs.map(renderConfigCard)}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="current" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Configuration Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold">Compute Requirements</h3>
                        <p><strong>CPU:</strong> {computeRequirements.cpuCount} cores</p>
                        <p><strong>Memory:</strong> {computeRequirements.memorySize} GB</p>
                        <p><strong>Storage:</strong> {computeRequirements.storageSize} GB</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">Usage Pattern</h3>
                        <p><strong>Hours per day:</strong> {usagePattern.hoursPerDay}</p>
                        <p><strong>Days per month:</strong> {usagePattern.daysPerMonth}</p>
                        <p><strong>Interruptible:</strong> {usagePattern.isInterruptible ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Selected Platforms</h3>
                      <p><strong>Count:</strong> {platformSelections.selectedPlatforms.length}</p>
                      <p><strong>Platforms:</strong> {platformSelections.selectedPlatforms.join(", ")}</p>
                      <p><strong>Region:</strong> {platformSelections.region}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setEditMode(null);
                      setConfigName("");
                      setConfigDescription("");
                      setSaveDialogOpen(true);
                    }}
                  >
                    <Save className="mr-1 h-4 w-4" />
                    Save This Configuration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Save Configuration Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Configuration" : "Save Configuration"}</DialogTitle>
            <DialogDescription>
              {editMode ? "Update your saved configuration." : "Save your current configuration for future use."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="config-name">Configuration Name *</Label>
              <Input
                id="config-name"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder="Enter a name for this configuration"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="config-description">Description (Optional)</Label>
              <Textarea
                id="config-description"
                value={configDescription}
                onChange={(e) => setConfigDescription(e.target.value)}
                placeholder="Add an optional description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" onClick={() => {
              setSaveDialogOpen(false);
              setEditMode(null);
              setConfigName("");
              setConfigDescription("");
            }}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={saveConfiguration}>
              <Save className="mr-1 h-4 w-4" />
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}