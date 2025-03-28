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
      <Card key={config.id} className="mb-4 border border-blue-200 bg-blue-50 hover:shadow-lg transition-all duration-300 shadow-sm">
        <CardHeader className="pb-2 border-b border-blue-200">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold text-blue-900">{config.name}</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0 border-blue-300 bg-white hover:bg-blue-100 hover:text-blue-700" 
                onClick={() => startEdit(config)}
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0 text-red-500 border-red-200 bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-300" 
                onClick={() => deleteConfiguration(config.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <CardDescription className="text-xs flex items-center mt-1 text-blue-700">
            <Clock className="h-3 w-3 mr-1" /> Created {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm pb-2 pt-3">
          {config.description && (
            <p className="text-blue-800 mb-3 bg-white p-2 rounded border border-blue-100 italic">{config.description}</p>
          )}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-2 rounded border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-1 pb-1 border-b border-blue-50">Compute Requirements</h3>
              <p className="text-blue-800"><strong>CPU:</strong> {config.computeRequirements.cpuCount} cores</p>
              <p className="text-blue-800"><strong>Memory:</strong> {config.computeRequirements.memorySize} GB</p>
              <p className="text-blue-800"><strong>Storage:</strong> {config.computeRequirements.storageSize} GB</p>
            </div>
            <div className="bg-white p-2 rounded border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-1 pb-1 border-b border-blue-50">Usage & Platforms</h3>
              <p className="text-blue-800"><strong>Usage:</strong> {config.usagePattern.hoursPerDay} hrs/day, {config.usagePattern.daysPerMonth} days/month</p>
              <p className="text-blue-800"><strong>Interruptible:</strong> {config.usagePattern.isInterruptible ? "Yes" : "No"}</p>
              <p className="text-blue-800"><strong>Platforms:</strong> {platformCount} selected</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full bg-primary hover:bg-primary/90 text-white shadow" 
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
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-blue-100 border-blue-300">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-bold text-blue-900">Saved Configurations</DialogTitle>
            <DialogDescription className="text-blue-800">
              Load previously saved configurations or save your current settings.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="saved" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-blue-200 p-1 dark:bg-blue-800">
              <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 data-[state=active]:shadow-md">Saved Configurations</TabsTrigger>
              <TabsTrigger value="current" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 data-[state=active]:shadow-md">Current Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved" className="mt-4">
              {loading ? (
                <div className="text-center py-10 rounded-md bg-blue-50 border-2 border-dashed border-blue-300 shadow-inner">
                  <p className="text-blue-800 text-lg">Loading saved configurations...</p>
                  <div className="mt-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
                </div>
              ) : configs.length === 0 ? (
                <div className="text-center py-10 rounded-md bg-blue-50 border-2 border-dashed border-blue-300 shadow-inner">
                  <p className="text-blue-800 mb-3 text-lg">No saved configurations yet</p>
                  <Button 
                    variant="default" 
                    className="bg-primary hover:bg-primary/90 text-white shadow-md"
                    onClick={() => {
                      setEditMode(null);
                      setConfigName("");
                      setConfigDescription("");
                      setSaveDialogOpen(true);
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Current Configuration
                  </Button>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex justify-end mb-4">
                    <Button 
                      variant="default"
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white shadow-md"
                      onClick={() => {
                        setEditMode(null);
                        setConfigName("");
                        setConfigDescription("");
                        setSaveDialogOpen(true);
                      }}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Current Configuration
                    </Button>
                  </div>
                  {configs.map(renderConfigCard)}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="current" className="mt-4">
              <Card className="bg-blue-50 border-blue-200 shadow">
                <CardHeader className="pb-2 border-b border-blue-200">
                  <CardTitle className="text-blue-900 font-bold">Current Configuration Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white p-3 rounded-md shadow-sm border border-blue-100">
                        <h3 className="font-semibold text-blue-900 mb-2 text-base">Compute Requirements</h3>
                        <p className="text-blue-800"><strong>CPU:</strong> {computeRequirements.cpuCount} cores</p>
                        <p className="text-blue-800"><strong>Memory:</strong> {computeRequirements.memorySize} GB</p>
                        <p className="text-blue-800"><strong>Storage:</strong> {computeRequirements.storageSize} GB</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md shadow-sm border border-blue-100">
                        <h3 className="font-semibold text-blue-900 mb-2 text-base">Usage Pattern</h3>
                        <p className="text-blue-800"><strong>Hours per day:</strong> {usagePattern.hoursPerDay}</p>
                        <p className="text-blue-800"><strong>Days per month:</strong> {usagePattern.daysPerMonth}</p>
                        <p className="text-blue-800"><strong>Interruptible:</strong> {usagePattern.isInterruptible ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md shadow-sm border border-blue-100 h-fit">
                      <h3 className="font-semibold text-blue-900 mb-2 text-base">Selected Platforms</h3>
                      <p className="text-blue-800"><strong>Count:</strong> {platformSelections.selectedPlatforms.length}</p>
                      <p className="text-blue-800"><strong>Platforms:</strong> {platformSelections.selectedPlatforms.join(", ")}</p>
                      <p className="text-blue-800"><strong>Region:</strong> {platformSelections.region}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white shadow" 
                    onClick={() => {
                      setEditMode(null);
                      setConfigName("");
                      setConfigDescription("");
                      setSaveDialogOpen(true);
                    }}
                  >
                    <Save className="mr-2 h-5 w-5" />
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
        <DialogContent className="sm:max-w-[425px] bg-blue-100 border-blue-300">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-bold text-blue-900">
              {editMode ? "Edit Configuration" : "Save Configuration"}
            </DialogTitle>
            <DialogDescription className="text-blue-800">
              {editMode ? "Update your saved configuration." : "Save your current configuration for future use."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 bg-white p-4 rounded-md shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="config-name" className="text-blue-900 font-medium">
                Configuration Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="config-name"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder="Enter a name for this configuration"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="config-description" className="text-blue-900 font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="config-description"
                value={configDescription}
                onChange={(e) => setConfigDescription(e.target.value)}
                placeholder="Add an optional description"
                rows={3}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between items-center pt-4">
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => {
                setSaveDialogOpen(false);
                setEditMode(null);
                setConfigName("");
                setConfigDescription("");
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={saveConfiguration}
            >
              <Save className="mr-2 h-4 w-4" />
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}